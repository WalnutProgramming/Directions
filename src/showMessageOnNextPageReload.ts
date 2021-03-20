export const messageOnNextPageReloadKey = "messageOnNextPageReload";

export function showMessageOnNextPageReload(message: string) {
  sessionStorage.setItem(messageOnNextPageReloadKey, message);
}

export function refreshToUpdate() {
  showMessageOnNextPageReload("Updated site");
  window.location.reload();
}
