import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { NewsComponent } from './news.component';
import { ApiService } from '../api.service';
import { HttpTestingController } from '@angular/common/http/testing';

function AClass() {
  this.aFunction = function () {
    return "I did the thing";
  }
}

xdescribe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  let apiService: jasmine.SpyObj<ApiService>;
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getNews']);
    // const testSpy1 = jasmine.createSpy('ApiService', ['getTranslations']);

    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [HttpClientModule],
      // replace ApiService dependency with a spy 
      providers: [{ provide: ApiService, useValue: spy }],
    }).compileComponents();
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    apiService.getNews.and.returnValue(of({}));
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterAll(() => {
    console.log(fixture);
    console.log(component);
  });

  afterEach(() => {
  });

  xit('should set articles on the component', fakeAsync(() => {
    fixture.detectChanges();
    // expect(mySpy.calls.any()).toBe(true);
    expect(component.articles?.length).toBe(10); // Assuming 10 mock articles
  }));

  it('#service should be Truthy', () => {
    expect(apiService).toBeTruthy();
  });

  xit('#fixture should be Truthy', async(() => {
    // wait for formControl
    fixture.whenStable().then(() => {
      expect(fixture).toBeTruthy();
    })
  }));
  xit('#component should be Truthy', async(() => {
    // wait for formControl
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    })
  }));
  it('#service method should be called', () => {
    console.log(apiService.getNews()); // call function
    expect(apiService.getNews).toHaveBeenCalled();
  })
  xit('should spy on somethings', () => {
    let spyFunctions = spyOnAllFunctions(component);
    console.log(`The spyFunctions looks like this: ${spyFunctions}`);
    expect(spyFunctions).toBeDefined();
  })
  xit('should return "test" from spy function', fakeAsync(() => {
    let returnedVal: any;
    let Subscription = apiService.getNews().subscribe((result) => {
      returnedVal = result;
    });
    expect(returnedVal).toEqual({ articles: 'test' });
    expect(returnedVal['articles']).toEqual('test');
    Subscription.unsubscribe(); // should this go inside of afterAll()? 
  }))
  xit('should return "hello" from spy function', () => {
    let hola;
    console.log('Returned from getNews is: ', apiService.getNews().subscribe((result) => { hola = result; }));
    expect(hola).toEqual({ articles: 'test' });
    expect(hola['articles']).toEqual('test');
  })

});

describe("should test jasmine concepts", () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let spyService;
  let getNews;
  let newsArticles;
  beforeEach(async(() => {

    /* since this is in the array you access the 'test' by
    1. newsArticles[0] = { articles: { 'title': 'test' } }
    2. newsArticles[0].articles = {'title': 'test'}
    3. newsArticles[0].articles.title = 'test' */
    let newsArticles = [{ articles: { 'title': 'test' } }];
    // creates a fake function called getNews in ApiService that is called "mySpy" 
    // and returns newsArticles when called
    spyService = jasmine.createSpyObj('spyService', ["getNews"]);
    getNews = spyService.getNews.and.returnValue(of(newsArticles));

    TestBed.configureTestingModule({
      declarations: [
        NewsComponent
      ],
      imports: [],
      providers: [
        { provide: ApiService, useValue: spyService }
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // async and fakeAsync have caused certain things to not show up in the console. waiting for undefined things to be defined.
  it("should create a spy on AFunction and use the fake function", fakeAsync(() => {
    let returnedVal;
    console.log(`spyService.getNews: ${spyService.getNews}`);
    spyService.getNews().subscribe((result) => {
      console.log(`This is what you get from getNews(): ${result[0].articles.title}\n${result.articles[0].title}`);
      returnedVal = result;
    });
    expect(spyService.getNews).toHaveBeenCalled();
    expect(returnedVal).toBe(newsArticles);
    // expect(service.getNews()).toEqual(articles);

  }))
});



