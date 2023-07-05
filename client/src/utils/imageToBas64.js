// converting images to base64
const main = (primary_event, func, data) => {
  if (primary_event.target.files) {
    const WIDTH = 600;
    const image_file = primary_event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const image = document.createElement('img');
      image.onload = (e) => {
        const canvas = document.createElement('canvas');
        const ratio = WIDTH / e.target.width;
        canvas.width = WIDTH;
        canvas.height = e.target.height * ratio;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const newImage = canvas.toDataURL(image_file.type, 0.9);
        document.getElementById('fileName').innerText = `${image_file.name}`;
        func({ ...data, [primary_event.target.name]: newImage });
      };
      image.src = evt.target.result;
    };
    reader.readAsDataURL(image_file);
  }
};

export default main;

export const clearFileName = () => {
  document.getElementById('fileName').innerText = '';
};
