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