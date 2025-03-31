export function isIpv6(ip: string): boolean {
	// https://ihateregex.io/expr/ipv6/
	const ipv6Pattern =
		/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
	return ipv6Pattern.test(ip);
}

export function isIpv4(ip: string): boolean {
	// https://ihateregex.io/expr/ip/
	const ipv4Pattern = /^(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
	return ipv4Pattern.test(ip);
}

export function convertIptoIpv6(ip: string): string {
	if (isIpv6(ip)) return ip;
	if (!isIpv4(ip)) throw new Error("Invalid IPv4 address");
	return `::ffff:${ip}`;
}

export function isLocalIp(ip: string): boolean {
	if (ip.startsWith("::ffff:")) {
		ip = ip.replace("::ffff:", "");
	}

	if (isIpv4(ip)) {
		return (
			ip.startsWith("10.") ||
			ip.startsWith("192.168.") ||
			/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) || // 172.16.0.0 - 172.31.255.255
			ip.startsWith("127.")
		);
	}

	if (isIpv6(ip)) {
		if (ip === "::1" || ip.startsWith("fe80") || ip.startsWith("FE80")) return true;
		const firstBlock = parseInt(ip.split(":")[0], 16);
		if ((firstBlock & 0xfe00) === 0xfc00) return true; // fc00::/7 (Unique local)
	}

	return false;
}
