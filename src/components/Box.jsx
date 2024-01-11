const Box = ({ value, onClick }) => {
  const style = value === "X" ? "box x" : "box o";

  return (
    <div className={style} onClick={onClick}>
      {value}
    </div>
  );
};

export default Box;
