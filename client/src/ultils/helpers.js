import icons from "./icons";

const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("-");

export const formatMoney = (number = 0) =>
  Number(number.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  // quy tắc hiện sao
  // 4 = [1, 1, 1, 1, 0]
  // 2 = [1, 1, 0, 0, 0]
  const stars = [];
  for (let i = 0; i < +number; i++) {
    stars.push(<AiFillStar color="#f1b400" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<AiOutlineStar color="#f1b400" size={size || 16} />);
  }
  return stars;
};

export function secondsToHms(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}
