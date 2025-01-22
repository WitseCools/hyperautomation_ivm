class WasteItem:
    def __init__(self, icon,name, shortExplanation, longExplanation, certainty):
        self.name = name
        self.short_explanation = shortExplanation
        self.long_explanation = longExplanation
        self.certainty = certainty
        self.icon = icon

    def serialize(self):
        return {
            'icon:': self.icon,
            'name': self.name,
            'short_explanation': self.short_explanation,
            'long_explanation': self.long_explanation,
            'certainty': self.certainty
        }