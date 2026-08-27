const DogProfile = ({ dog }) => {
  return (
    <div className="dog-profile">
      <h2>{dog.name}</h2>
      <img src={dog.image} alt={dog.name} />
      <p>Age: {dog.age}</p>
      <p>Weight: {dog.weight}</p>
      <p>Profile: {dog.profile}</p>
    </div>
  );
}