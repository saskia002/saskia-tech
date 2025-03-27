export const reziseImage = (imageFile: Blob, maxWidth?: number, maxHeight?: number) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(imageFile);
		reader.onload = (event) => {
			if (!event?.target?.result) {
				reject(new Error("Failed to load image target"));
			}

			if (!maxWidth && !maxHeight) {
				return resolve(event?.target?.result);
			}

			if (!maxHeight) {
				maxHeight = maxWidth;
			}

			const img: HTMLImageElement = new Image();
			img.src = event?.target?.result as string;

			img.onload = () => {
				const canvas = document.createElement("canvas");
				let width = img.width;
				let height = img.height;

				if (maxHeight && maxWidth) {
					if (width > maxWidth || height > maxHeight) {
						// Maintain aspect ratio
						if (width > height) {
							height *= maxWidth / width;
							width = maxWidth;
						} else {
							width *= maxHeight / height;
							height = maxHeight;
						}
					}
				}

				canvas.width = width;
				canvas.height = height;
				const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
				ctx.drawImage(img, 0, 0, width, height);

				resolve(canvas.toDataURL("image/jpeg", 0.8));
			};

			img.onerror = reject;
		};
		reader.onerror = reject;
	});
};
