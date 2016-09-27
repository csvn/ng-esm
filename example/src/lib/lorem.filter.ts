import { Filter, FilterTransform } from 'ng-esm';


@Filter()
export class Lorem implements FilterTransform {
  transform(): string {
    return `
      Lorem ipsum dolor sit amet, hasta la vista baby-cakes!
      Mr. Ipsum has now left the base. Feel free to skip reading this.
      Seriously, this is nonsense...... are you still reading? Goddammit!
      It's time to go do something productive, and not read this wall of
      bogus! Maybe you could do the dishes? Or take the dog out for a walk?
      Cure world hunger? ...You're still reading... aren't you? *sigh*
      I'm outta here! <door closing> <steps fading away> <car starting>
      <car burning away> <car honking and fading away in the distance>
      ................................................................
      What do I write to make you go away?`;
  }
}
