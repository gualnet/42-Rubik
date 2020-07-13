
/**
 * Binomial coefficient: n choose k
 */
export function Cnk(n: number, k: number):number {
  if (n < k) {
    return 0;
  }
  
  if (k > Math.floor(n / 2)) {
    k = n - k;
  }

  let s = 1;
  let i = n;
  let j = 1;

  while (i !== n - k) {
    s *= i;
    s = Math.floor(s / j);
    i -= 1;
    j += 1;
  }
  return s;
}

/**
 * Rotate an array on the left between r -> l
 * @param arr 
 * @param l 
 * @param r 
 */
export function rotateLeft(arr: Array<number>, l: number, r: number) {
  const temp = arr[l];
	for (let i = l; i < r; i++) {
		arr[i] = arr[i + 1];
  }
  arr[r] = temp;
  return arr
};

/**
 * Rotate an array on the right between l -> r
 * @param arr 
 * @param l 
 * @param r 
 */
export function rotateRight(arr: Array<number>, l: number, r: number) {
  const temp = arr[r];
	for (let i = r; i < l; i--) {
		arr[i] = arr[i - 1];
  }
  arr[l] = temp;
  return arr
}