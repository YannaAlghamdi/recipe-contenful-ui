export class Model {
  private id: string;

  public getId(): string { return this.id; }
  public withId(arg: string) { this.id = arg; return this; }
}
