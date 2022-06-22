import hero from "./../../../assets/images/hero.jpg";

export const Hero = () => {
  return (
    <div
      className={
        "flex flex-col justify-center px-8 text-gray-100 pt-9 h-screen"
      }
      style={{
        background: `rgba(50, 50, 50, 0.312) url('${hero}')`,
        backgroundBlendMode: "darken",
        backgroundSize: "cover",
      }}
    >
      <div className="text-5xl font-bold text-center">
        Booking pilihan paket tatarias
      </div>
      <div className="mt-2 text-4xl font-semibold text-center pb-14">
        Dapatkan diskon 10% atau lebih dengan booking di sini
      </div>
    </div>
  );
};
