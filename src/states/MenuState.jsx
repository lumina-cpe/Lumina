import SideBar from "../components/SideBar";
import IconButton from "../components/IconButton";

export default function MenuState() {

  const handleClick = (name) => {
    console.log("You clicked " + name);
  };

  return (
    <>
      {/* Sidebar */}
      <SideBar onItemClick={handleClick} />

      {/* Icon buttons */}
      <div>
        <IconButton 
          imagePath="https://avatars.githubusercontent.com/u/69833152?v=4&size=64"
          onClick={() => handleClick("ICON1")}
        />
        <IconButton 
          imagePath="https://avatars.githubusercontent.com/u/69833152?v=4&size=64"
          onClick={() => handleClick("ICON2")}
        />
      </div>
    </>
  );
}
