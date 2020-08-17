class Notification {
  constructor({ type, imageName }) {
    this._type = type;
    this._imageName = imageName;
    this._notificationTemplate = document.querySelector(
      '#notification',
    ).content;
  }

  changeNotificationText({ text = '', subtext = '' }) {
    this._notification.querySelector('.notification__text').textContent = text;
    this._notification.querySelector(
      '.notification__subtext',
    ).textContent = subtext;
  }

  showNotification() {
    this._notification.classList.add('notification_visible');

    setTimeout(() => {
      this._deleteNotification();
    }, 5000);
  }

  _deleteNotification() {
    this._notification.classList.remove('notification_visible');

    setTimeout(() => {
      this._notification.remove();
    }, 1000);
  }

  _placeDataInNotification({ text, subtext }) {
    this._notification.classList.add('notification_type_info');

    this._notification
      .querySelector('.iconify')
      .setAttribute('data-icon', `el:${this._imageName}`);

    this.changeNotificationText({ text, subtext });
  }

  _addEventListenersToNotification() {
    this._notification.addEventListener('click', () => {
      this._deleteNotification();
    });
  }

  createNotification({ text = '', subtext = '' }) {
    this._notification = this._notificationTemplate
      .querySelector('.notification')
      .cloneNode(true);

    this._placeDataInNotification({ text, subtext });
    this._addEventListenersToNotification();

    document.querySelector('.page').append(this._notification);
  }
}

export default Notification;
