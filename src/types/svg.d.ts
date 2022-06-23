// Fixes svg import
declare module "*.svg" {
	const content: any;
	export default content;
}
