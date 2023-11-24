import React, { memo } from "react";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src="https://img.freepik.com/vector-premium/banner-entrega-rapida-tienda-telefono-paquetes-ubicacion-estilo-realista-ilustracion-vectorial_548887-125.jpg?w=2000"
        alt="banner"
        className="h-[360px] w-full object-cover"
      />
    </div>
  );
};

export default memo(Banner);
