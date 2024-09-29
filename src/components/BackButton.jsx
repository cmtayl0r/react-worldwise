import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        // Prevent the default behavior of the button
        e.preventDefault();
        // Navigate back to the previous page
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
