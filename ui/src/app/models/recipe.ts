import { Model } from '../model';

export class Recipe extends Model {
  private title: string;
  private description: string;
  private tags: Array<string>;
  private photoUrl: string;
  private chef?: string;
  private calories: number;

  public getTitle(): string { return this.title; }
  public withTitle(arg: string) { this.title = arg; return this; }

  public getDescription(): string { return this.description; }
  public withDescription(arg: string) { this.description = arg; return this; }

  public getTags(): Array<string> { return this.tags; }
  public withTags(arg: Array<string>) { this.tags = arg; return this; }

  public getPhotoUrl(): string { return this.photoUrl; }
  public withPhotoUrl(arg: string) { this.photoUrl = arg; return this; }

  public getChef(): string { return this.chef; }
  public withChef(arg: string) { this.chef = arg; return this; }

  public getCalories(): number { return this.calories; }
  public withCalories(arg: number) { this.calories = arg; return this; }

}
