from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client.safargo

initial_destinations = [
  {
    "title": "Santorini Sunset",
    "location": "Greece",
    "image": "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1964&auto=format&fit=crop",
    "price": 12000,
    "rating": 4.9,
    "days": 7,
    "description": "Experience the ultimate Greek getaway. Santorini is famous for its dramatic views, white-washed buildings, and stunning sunsets over the Aegean Sea. Wander through the charming narrow streets of Oia, visit iconic blue-domed churches, and savor exquisite Mediterranean cuisine alongside local wines.",
    "highlights": [
      "Spectacular Oia Sunset Cruise",
      "Traditional Wine Tasting Tour",
      "Ancient Akrotiri Guided Exploration",
      "Luxury Cliffside Accommodations"
    ]
  },
  {
    "title": "Bali Tropical Escape",
    "location": "Indonesia",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
    "price": 8500,
    "rating": 4.8,
    "days": 10,
    "description": "Immerse yourself in a tropical paradise. Bali offers a beautiful mix of lush jungle landscapes, pristine beaches, vibrant culture, and ancient temples. Explore Ubud's famous monkey forest and terraced rice paddies, learn surfing on Kuta beach, and enjoy traditional Balinese spa treatments.",
    "highlights": [
      "Ubud Sacred Monkey Forest Sanctuary",
      "Tegallalang Rice Terrace Trekking",
      "Tanah Lot Temple Sunset Visit",
      "Balinese Cooking Masterclass & Spa"
    ]
  },
  {
    "title": "Swiss Alps Adventure",
    "location": "Switzerland",
    "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    "price": 15000,
    "rating": 4.9,
    "days": 5,
    "description": "Embark on an exhilarating journey through the majestic snow-capped peaks of Switzerland. Perfect for adventure lovers and nature enthusiasts alike. Hike through alpine meadows, ski down world-class slopes in Zermatt, and ride the scenic Glacier Express railway for unparalleled panoramic views.",
    "highlights": [
      "Zermatt & Matterhorn Panoramic Hiking",
      "Glacier Express Scenic Train Journey",
      "Interlaken Adventure Sports Day",
      "Swiss Chocolate & Cheese Tasting Tour"
    ]
  },
  {
    "title": "Kyoto Temple Tour",
    "location": "Japan",
    "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    "price": 11000,
    "rating": 4.7,
    "days": 8,
    "description": "Step back in time to Japan's cultural heart. Kyoto is renowned for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses. Walk through the mystical Arashiyama Bamboo Grove, witness the golden splendor of Kinkaku-ji, and experience a peaceful tea ceremony.",
    "highlights": [
      "Fushimi Inari Shrine Thousand Torii Gates",
      "Kinkaku-ji Golden Pavilion Private Tour",
      "Arashiyama Bamboo Forest Walk",
      "Traditional Tea Ceremony & Geisha District Tour"
    ]
  },
  {
    "title": "Machu Picchu Trek",
    "location": "Peru",
    "image": "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop",
    "price": 9500,
    "rating": 4.8,
    "days": 6,
    "description": "Trek the legendary path of the Incas to the ancient fortress of Machu Picchu. High in the Andes Mountains of Peru, this UNESCO World Heritage site is a breathtaking marvel of engineering and history. Hike along mountain trails, witness stunning vistas at the Sun Gate, and explore the mystical ruins with expert historians.",
    "highlights": [
      "Inca Trail Guided Hiking Expedition",
      "Machu Picchu Archeological Site Private Tour",
      "Sacred Valley Scenic Train Ride",
      "Cusco Historic Center Cultural Tour"
    ]
  },
  {
    "title": "Maldives Overwater",
    "location": "Maldives",
    "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    "price": 22000,
    "rating": 5.0,
    "days": 7,
    "description": "Indulge in pure luxury in the heart of the Indian Ocean. The Maldives is the ultimate destination for relaxation and romance, featuring crystal-clear turquoise waters, vibrant coral reefs teeming with marine life, and premium overwater villas with private lagoons.",
    "highlights": [
      "Luxury Overwater Villa with Private Pool",
      "Coral Reef Guided Snorkeling & Scuba",
      "Sunset Dolphin Watching Cruise",
      "Private Island Beachfront Dinner"
    ]
  }
]

def seed_db():
    # Force updating existing collections by dropping and re-inserting to ensure descriptions and highlights are loaded.
    db.destinations.drop()
    db.destinations.insert_many(initial_destinations)
    print("Database seeded and updated successfully with detailed destinations!")

if __name__ == "__main__":
    seed_db()
