function lcs(text1, text2) {
  const N = text1.length,
    M = text2.length;
  if (!N || !M) {
    return 0;
  }
  const dp = Array(N)
    .fill(null)
    .map(() => Array(M).fill(0));
  text1 = text1.toLowerCase().replace(/\s/g, "");
  text2 = text2.toLowerCase().replace(/\s/g, "");
  for (let i = N - 1; i >= 0; i--) {
    for (let j = M - 1; j >= 0; j--) {
      if (text1[i] == text2[j]) {
        dp[i][j]++;
        if (i + 1 < N && j + 1 < M) {
          dp[i][j] += dp[i + 1][j + 1];
        }
      } else {
        for (const [di, dj] of [
          [i, j + 1],
          [i + 1, j],
        ]) {
          if (di < N && dj < M) {
            dp[i][j] = Math.max(dp[i][j], dp[di][dj]);
          }
        }
      }
    }
  }
  return dp[0][0];
}

function gotToHome() {
  const url = new URL("amazon.html", location.origin);
  const searchQuery = document.querySelector(".js-search-bar").value;
  if (searchQuery) {
    url.searchParams.set("search", searchQuery);
  }
  location.href = url.href;
}

export function hasSearchQuery(text, searchQuery, threshold = 0.6) {
  searchQuery = searchQuery.replace(/\s/g, "");
  return (
    lcs(text, searchQuery) >=
    Math.round(Math.max(1, searchQuery.length * threshold))
  );
}

export function addSearchEvents() {
  document.querySelector(".js-search").addEventListener("click", gotToHome);
  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key == "Enter") gotToHome();
    });
}
