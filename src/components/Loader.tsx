import loader from '@/assets/loader.svg';

interface TitleT {
  title?: string;
}

const Loader = ({ title = "Loading..." }: TitleT) => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
      <h1 className="font-bold text-2xl text-white mt-2">
        {title}
      </h1>
    </div>
  );
};

export default Loader;
