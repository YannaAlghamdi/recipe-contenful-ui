export class ListOpts {
  private skip: number;
  private limit: number;

  public getSkip(): number { return this.skip; }
  public withSkip(arg: number) { this.skip = arg; return this; }

  public getLimit(): number { return this.limit; }
  public withLimit(arg: number) { this.limit = arg; return this; }

}
