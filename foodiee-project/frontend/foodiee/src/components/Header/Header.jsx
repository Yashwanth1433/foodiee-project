import './Header.css';
import { useEffect , useState} from 'react';

const Header = () => {

  //List of header tags.
  const headerTags = [
    {
      tagline: "Delicious Delivered Fast.",
      description: "Enjoy your favorite dishes delivered quickly to your doorstep."
    },
    {
      tagline: "Your Favorite Meals, Just a Tap Away.",
      description: "Order the food you love with just a few taps on your phone."
    },
    {
      tagline: "Savor Every Bite, Without the Wait.",
      description: "Get your meals promptly and savor every delicious bite."
    },
    {
      tagline: "From Kitchen to Doorstep in No Time.",
      description: "Experience the convenience of fresh food delivered straight to you."
    },
    {
      tagline: "Feast at Your Fingertips.",
      description: "Explore a wide variety of meals and have them delivered fast."
    },
    {
      tagline: "Crave It? We’ll Deliver It.",
      description: "Whether you’re craving pizza or sushi, we’ll bring it to your door."
    },
    {
      tagline: "Good Food, No Fuss.",
      description: "Effortless ordering for tasty meals delivered right to you."
    },
    {
      tagline: "Taste the Convenience.",
      description: "Enjoy the ease of having your favorite meals delivered quickly."
    },
    {
      tagline: "Hungry? We’ve Got You Covered.",
      description: "We handle the delivery so you can focus on enjoying your food."
    },
    {
      tagline: "Fresh Eats, Delivered Quick.",
      description: "Get fresh and tasty food delivered to you in no time."
    }
  ]

  //To get random header tag
  function getRandomTagline() {
    const randomIndex = Math.floor(Math.random() * headerTags.length);
    return headerTags[randomIndex];
  }

  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');

  //to set header tag on first render.
  useEffect(() => {
    const selectedTag = getRandomTagline();
    setTagline(selectedTag.tagline);
    setDescription(selectedTag.description);
  }, [])
  

  return (
    <div className="header-container">
      <div className="tagline">
        <h2>{tagline}</h2>
        <h5>{description}</h5>
      </div>
    </div>
  )
}

export default Header