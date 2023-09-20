from dataclasses import dataclass

@dataclass
class Item:
    title: str
    action: str
    timestamp: str
    link: str
    text: str
    cleaned_text: str
    products: str