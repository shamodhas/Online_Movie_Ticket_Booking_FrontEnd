type inputProps = {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  optional: boolean;
  callBack: Function;
  value?: string;
  ref?:any
};

const Input = (props: inputProps) => {
  return (
    <div className={"w-full"}>
      <label htmlFor={props.name} className={"block text-white text-xs mb-1"}>
        {props.label}{" "}
        {!props.optional ? <span className="text-red-600">*</span> : null}
      </label>
      <input
        type={props.type}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.callBack(e, props.name)}
        ref={props.ref}
      />
    </div>
  );
};

export default Input;
