import { createSocialImage } from "./social-image";

export const alt = "Tom Korený — Software Developer and DevOps Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return createSocialImage();
}
