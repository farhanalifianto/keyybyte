type LabelProps = {
  text: string;
};

const Label = (props: LabelProps) => {
  const { text } = props;
  return (
    <label className="block text-slate-700 text-sm font-bold mb-2">
      {text}
    </label>
  );
};
export default Label;
