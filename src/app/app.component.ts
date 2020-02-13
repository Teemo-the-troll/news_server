import { Component } from '@angular/core';
import { NewsApi } from 'newsapi';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-news-server';
 

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
   
   }
   
  
   
 

  getJSON(){
    
    let tofind = "q=" + document.getElementById("topic").value;
    let topOrAny;
    if (tofind == "q="){
       topOrAny = "everything"
    } else topOrAny = "top-headlines"
    let relevancy = "&sortBy=" + document.getElementById("sortBy").value;
    let category = "&category=" + document.getElementById("category").value;
    let language = "&language=" + document.getElementById("language").value;
    let url = "https://newsapi.org/v2/" + topOrAny +"?" + tofind + category +  relevancy+ language + "&apiKey=cf1fb69bfa4c4d99968832cb707580b7";
    console.log(url);
    
    this.httpClient
      .get(url)
      .subscribe(
        (data) => {
         console.log(data);
         const component = document.getElementById("results");

         while (component.firstChild) {
          component.removeChild(component.firstChild);}
         for (let i = 0; i < 20; i++) {
          const container = document.createElement('div');
          const header = document.createElement('h2');
          const info = document.createElement('p');
          const picture = document.createElement('img');
          header.innerHTML = data.articles[i].title;
          info.innerHTML = data.articles[i].description;
          picture.src = data.articles[i].urlToImage;
          
          container.appendChild(header);
          container.appendChild(picture);
          container.appendChild(info);
          component.appendChild(container);
         }
 

        }, (error) => {
          console.log("you fucked up")
        });
      
  }
  
}
