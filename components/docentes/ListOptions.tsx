import Image from "next/image";
import chevronRight from "@/assets/svg/chevron-right.svg"


interface IProps {
  title: string;
  body: string;
}

const TextOption = ({ title, body }: IProps) => {
  return (
    <div className="flex gap-2 justify-start items-start">
      <Image src={chevronRight} className="bg-green-700 rounded-full w-auto h-auto" alt={'icon'} width={16} height={16} />
      <p className="text-slate-700 text-base font-medium">
        <span className="text-slate-700 text-base font-bold">
          {title}{", "}
        </span>
        {body}
      </p>
    </div>
  );
};

export default TextOption;
