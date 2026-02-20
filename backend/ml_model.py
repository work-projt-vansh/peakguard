import numpy as np
from sklearn.linear_model import LinearRegression

class EnsemblePredictor:
    """
    Lightweight Ensemble Predictor for short-term energy load forecasting.
    Combines Linear Regression (trend-based) with Moving Average (recency-based).
    Optimized for low-RAM systems (4GB).
    """
    def __init__(self, window_size=10):
        self.window_size = window_size
        self.lr_model = LinearRegression()

    def predict_linear(self, data):
        """Fits a linear trend to the last N points and projects the next value."""
        if len(data) < 2:
            return data[-1] if data else 0
        
        # Prepare indices as X (0, 1, 2...) and values as y
        y = np.array(data[-self.window_size:]).reshape(-1, 1)
        X = np.arange(len(y)).reshape(-1, 1)
        
        self.lr_model.fit(X, y)
        next_index = np.array([[len(y)]])
        prediction = self.lr_model.predict(next_index)
        return float(prediction[0][0])

    def predict_moving_avg(self, data):
        """Calculates the simple moving average of the recent window."""
        if not data:
            return 0
        recent_data = data[-self.window_size:]
        return sum(recent_data) / len(recent_data)

    def predict_load(self, data):
        """
        Ensemble logic: Weighted average of Linear Regression and Moving Average.
        LR catches trends (rising/falling), MA provides a stable baseline.
        """
        if not data:
            return 0
        
        lin_pred = self.predict_linear(data)
        ma_pred = self.predict_moving_avg(data)
        
        # Weighting: 60% Linear Trend, 40% Moving Average
        ensemble_pred = (lin_pred * 0.6) + (ma_pred * 0.4)
        return ensemble_pred

def get_ensemble_forecast(history_values):
    """Utility function for the API to call the ensemble logic."""
    predictor = EnsemblePredictor()
    prediction = predictor.predict_load(history_values)
    return prediction
