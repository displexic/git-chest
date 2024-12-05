interface FormatDateOptions {
  onlyDate?: boolean;
  onlyTime?: boolean;
}

export const formatDate = (
  date: string | Date,
  options?: FormatDateOptions,
): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (options?.onlyDate) {
    return `${year}-${month}-${day}`;
  } else if (options?.onlyTime) {
    return `${hours}:${minutes}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
};

export const durationSince = (date: string | Date): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const now = new Date();
  const duration = now.getTime() - date.getTime();

  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks < 4) {
    return `${weeks}w`;
  } else if (months < 12) {
    return `${months}mo`;
  } else {
    return `${years}y`;
  }
};
