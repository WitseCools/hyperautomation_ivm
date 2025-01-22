class WasteItem:
    def __init__(self, name, shortExplanation, longExplanation, certainty, icon):
        self.name = name
        self.short_explanation = shortExplanation
        self.long_explanation = longExplanation
        self.certainty = certainty
        self.icon = icon

    def serialize(self):
        return {
            'name': self.name,
            'short_explanation': self.short_explanation,
            'long_explanation': self.long_explanation,
            'certainty': self.certainty,
            'icon': self.icon
        }