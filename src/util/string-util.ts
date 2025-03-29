export function capitalizeFirstLetter(string: string) {
	return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function removeEmojis(str: any) {
	return str.replace(/[\p{Extended_Pictographic}\p{Emoji_Component}]/gu, "");
}
