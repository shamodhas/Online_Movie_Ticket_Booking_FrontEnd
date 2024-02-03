type CloseButtonProps = {
  className: string;
  callBack: Function;
};
function CloseButton({ className, callBack }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={
        className +
        " text-white bg-red-500 w-[25px] h-[25px] rounded-full flex justify-center items-center "
      }
      onClick={(e) => callBack(e)}
    >
      X
    </button>
  );
}
export default CloseButton;
