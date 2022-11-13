import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'sfc-flag-icon',
  templateUrl: './flag-icon.component.html',
  styleUrls: ['./flag-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagIconComponent {
  @Input() set country(value: string) {
    this.internalCountry = value;
  }

  get country() {
    return this.internalCountry;
  }

  private internalCountry = ``;

  get flagUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.flagIconBaseUrl}/${this.country}`
    );
  }

  constructor(private sanitizer: DomSanitizer) {}

  private flagIconBaseUrl = environment.flagIconBaseUrl;
}
