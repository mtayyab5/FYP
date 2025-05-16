exports.detectDisease = async (req, res) => {
    // Placeholder detection logic
    res.status(200).json({
      prediction: 'Leaf Blight',
      confidence: 0.93,
      message: 'Detection successful',
    });
  };
  