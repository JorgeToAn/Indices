import { MantineProvider } from "@mantine/core";

/* indicesTheme contiene todos los cambios globales que se le realizan al tema de mantine */
const indicesTheme = {
    fontFamily: "Inter, sans-serif",
      colorScheme: 'light',
      colors: {
        'toronja': ["#FF785A", "#F3DDD9","#EEBEB3","#F29D8A", "#FEFCFC","#EB684B","#D65D42","#BE553D","#A05443","#875144","#744C44"],
        'negro': ["#2C2C2C", "#282828", "#252525", "#212121", "#1E1E1E", "#1C1C1C", "#191919", "#171717", "#141414", "#121212", "#101010", "#0F0F0F", "#0D0D0D"],
        'naranja': [
          "#FEFDFC",
          "#F3E5D9",
          "#EED0B3",
          "#F2BC8A",
          "#FFAA5A",
          "#EB994B",
          "#D68942",
          "#BE7C3D",
          "#A07043",
          "#876544",
          "#745B44"
        ],
        'verde': [
          "#EEF8F0",
          "#CCEDD4",
          "#A8E9B7",
          "#80ED99",
          "#6EDB87",
          "#60C778",
          "#56B46C",
          "#539D64",
          "#51865D",
          "#4E7457"
        ],
        "gris": [
          "#F6F6F6",
          "#E0E0E0",
          "#CBCBCB",
          "#B9B9B9",
          "#A7A7A7",
          "#969696",
          "#878787",
          "#797979",
          "#6D6D6D",
          "#626262"
        ],
      },
      defaultRadius: 10,
      primaryShade: 5,
      primaryColor: 'toronja',
};


export default indicesTheme;