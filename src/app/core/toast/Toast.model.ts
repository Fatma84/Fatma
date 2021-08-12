/**
 * Generate new Toast message with Toast type
 * @constructor
 * @param {string} header - Identify the header of the Toast
 * @param {string} message - Identify the message of the Toast
 * @param {number} typeCode - Identify the Code of the type of the Toast 1 => primary, 2 => secondry, 3 => danger, 4 => warning, 5 => info, 6 => dark
 * @function type -> to get the type of the Toast as string
 *
 */
export class Toast {
  constructor(
    public header: string,
    public message: string,
    public typeCode: number
  ) {}

  get type() {
    let color: string;

    if (this.typeCode === 1) {
      color = 'primary';
    } else if (this.typeCode === 2) {
      color = 'secondary';
    } else if (this.typeCode === 3) {
      color = 'tertiary';
    } else if (this.typeCode === 4) {
      color = 'danger';
    } else if (this.typeCode === 5) {
      color = 'success';
    } else if (this.typeCode === 6) {
      color = 'warning';
    } else if (this.typeCode) {
      color = 'dark';
    } else {
      color = 'white';
    }

    return color;
  }
}
