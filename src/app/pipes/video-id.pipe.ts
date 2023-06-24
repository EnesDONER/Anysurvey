import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoId'
})
export class VideoIdPipe implements PipeTransform {

  transform(value: string): string {
    const videoIdPattern = /(?<=v=|v\/|vi=|vi\/|youtu.be\/|\/v\/|embed\/|\/\d+\/|\/\d+\?v=|&v=|embed\/|youtu.be\/|\/v\/|e\/|watch\?v=|&v=|\/\w{11})([\w-]+)/;
    const videoIdMatch = value.match(videoIdPattern);
    
    if (videoIdMatch) {
      return videoIdMatch[0];
    } else {
      return '';
    }
  }

}
