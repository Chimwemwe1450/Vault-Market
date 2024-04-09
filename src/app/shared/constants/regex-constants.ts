export class RegexConstants {
  public static readonly FullNameSurnameRegex: RegExp = /^[-a-zA-Z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s']*$/;
  public static readonly NumericRegex: RegExp = /^\d+$/;

  // 0721231234 - 10 numbers only starting with a zero
  public static readonly TelephoneRegex: RegExp = /^(0[0-9]{2})\s{0,1}([0-9]{3})\s{0,1}([0-9]{4})$/;
  // public static readonly TelephoneRegex: RegExp = /^0[0-9]{9,9}$/;

  // +2712341234567890 - unlimited numbers and plus(+) allowed
  public static readonly IntTelephoneRegex: RegExp = /^[0-9+\s]*$/;

  public static readonly EmailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static readonly EmailMultipleRegex: RegExp = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|(\,\s?)((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;
  public static readonly NameRegex: RegExp = /^([^0-9])+$/;
  public static readonly PasswordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@\(\)##\$%_]{8,}$/;
}
