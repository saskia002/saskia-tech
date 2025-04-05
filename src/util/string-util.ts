export function capitalizeFirstLetter(string: string) {
	return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

// https://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript (last answer)
export function removeEmojis(str: any) {
	return str.replace(/(?!(\*|#|\d))[\p{Extended_Pictographic}\p{Emoji_Component}]|[\u0030-\u0039]\ufe0f?[\u20e3]|[\u002A\u0023]?\ufe0f?[\u20e3]/gu, "");
}
