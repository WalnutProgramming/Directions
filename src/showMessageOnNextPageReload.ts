export const messageOnNextPageReloadKey = "messageOnNextPageReload";

export function showMessageOnNextPageReload(message: string): void {
  sessionStorage.setItem(messageOnNextPageReloadKey, message);
}

export function refreshToUpdate(): void {
  showMessageOnNextPageReload("Updated site");
  window.location.reload();
}
