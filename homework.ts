//Разминка

// Определите интерфейс для пользователя
interface User{
    id:number;
    name:string;
    email:string;
}

// Определите интерфейс для активности пользователя
interface Activity{
    userId:number;
    activity:string;
    timestamp:Date;
}

// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
type ResponseFetch = {
    id:number,
    name:string,
    email:string,
    gender:string,
    status:string
}

async function fetchData<T>(url:string):Promise<T>{
    try{
        const response = await fetch(`${url}`);
        if(!response.ok){
            throw new Error('Network response was not ok' + response.statusText);
        }
        const data:T = await response.json();
         return data;
    }catch(error:any){
        throw new Error('Fetch error' + error.message);
    }
}

fetchData<ResponseFetch[]>('https://gorest.co.in/public/v2/users')
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))

// Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User>;
type ReadonlyActivity = Readonly<Activity>;

//Типизируйте функцию. userId - число
function getUserActivities(userId:number) {
    return fetchData(`/api/activities/${userId}`);
}

// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities>;

// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions<Permissions> = Permissions extends { canBanUser: boolean } ? Permissions : never;
type BasicPermissions<Permissions> =  Permissions extends { canEditProfile: boolean } ?  Permissions : never;

// Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
// type Permissions<T> = T extends {admin:boolean} ? 'Admin' : 'Basic';

///////////////////Часть 2////////////////////////////////////

// Определите Type Alias для Union типа String или Number
type StringOrNumber = String | Number

function logMessage(message: StringOrNumber): void {
    console.log(message);
}  

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
    return  value instanceof String;
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
    if(!(value instanceof Number)){
        throw new Error('value is not number!');
    }
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber):void {
    if(isString(value)){
        console.log(`String value: ${value.toUpperCase()}`);
    }else{
        assertIsNumber(value)
        console.log(`Number value: ${value.toFixed(2)}`);
    }
}

// Type Alias и Union
type StringOrNumber = string | number;

//сделайте  Type Guard для определения, является ли значение строкой
function isString(value:StringOrNumber) {
    return typeof value === 'string';
}

// создайте asserts function на число.
function assertIsNumber(value: any): asserts value is number {
  if(typeof value !== 'number'){
    throw new Error('value is not number');
  }
}

// Использование Type Guard и Asserts
function processValue(value: StringOrNumber) {
    if (isString(value)) {
      console.log(`String value: ${value.toUpperCase()}`);
    } else {
      assertIsNumber(value);
      console.log(`Number value: ${value.toFixed(2)}`);
    }
}


//------------------------------------------------------------



//------------------------------------------------------------
// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
interface CustomResponse<T> {
    data:T;
    status:number;
}

// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse<T>(data:T, status:number) {
    const response:CustomResponse<T> = {
        data:data,
        status:status
    }
    return response;
}

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse<number[]>([1,2,3,4,5],100);

// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const userResponse = createResponse<User>({id:1,name:'Mikl',email:'mikhail@example.com'},200);

//---------------------------------------------------------------
// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.

// Определите тип данных для описания автомобиля 
type Car = {
    company: string;
    model: string;
    year: number;
    condition:string;
    price:number;
    color:string;
    make:string
};

// Определите тип данных для описания велосипеда
type Bike = {
    company: string;
    type: 'road' | 'mountain';
    price:number;
    geers:number;
    brakes:'rim brakes' | 'disc brakes';
    make:string
};

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle:any): vehicle is Car  {
    return (
        typeof vehicle === 'object' &&
        vehicle !== null &&
        "company" in vehicle &&
        "model" in vehicle &&
        "year" in vehicle &&
        "condition" in vehicle &&
        "price" in vehicle &&
        "color" in vehicle
    );
}

// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: Car | Bike) {
    if (isCar(vehicle)) {
      console.log(`Car: ${vehicle.make} ${vehicle.model} ${vehicle.year}`);
    } else {
      console.log(`Bike: ${vehicle.make} ${vehicle.type}`);
    }
}

//------------------------------------------------------------------
// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

// Определите интерфейс Employee
interface Employee {
    id: number;
    name: string;
    department: string;
    email: string;
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee>;

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type ReadonlyEmployee = Readonly<Employee>;

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee) {
    if(employee.id) console.log(`Employee id - ${employee.id}`)
    if(employee.name) console.log(`Employee name - ${employee.name}`)
    if(employee.email) console.log(`Employee email - ${employee.email}`)
    if(employee.department) console.log(`Employee department - ${employee.department}`)
}

//-----------------------------------------------------------------
//Задание 5: Работа с Indexed Access Types и Mapped Types
//Цель: Создать утилиты для работы с объектами и их ключами.

// Определите интерфейс для пользователя
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Используйте Indexed Access Types для получения типа поля name из User
type UserNameType = User['name'];

// Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof 
type UserFieldsToBoolean<T> = {
    [P in keyof T]: boolean;
}

// Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
function getUserFieldType<K extends keyof User>(key:K):User[K] {
    return undefined as unknown as User[K];
}

// Используйте эту функцию для получения типа поля 'age' и 'name'
const ageType = getUserFieldType('age');
const nameType = getUserFieldType('name');


//---------------------------------------------------------------------
// Задание 6: Расширение и ограничение Generics
// Цель: Создать универсальные функции с ограничениями типов.

// Создайте базовый интерфейс для сущностей с идентификатором
interface Identifiable {
    id: number;
}
  
 // Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById<T extends Identifiable>(items:T[], id:number ): T | undefined {
    return items.find(item => item.id === id);
}
  
// Используйте эту функцию для поиска пользователя по id в массиве пользователей
const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
];
const user = findById(users, 1);

//---------------------------------------------------------------------------------
// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.

interface User {
    id: number;
    name: string;
    age: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
}
  
interface Book {
    isbn: string;
    title: string;
    author: string;
}

// Разберитесь с типизацией функции и поймите как она работает.
// Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
function findInArray<T, K extends keyof T>(items: T[],criteria:Partial<T>, key: K, value: T[K]): T | undefined {
    if(criteria){
        return items.find(item=>
                Object.keys(criteria).every(k => item[k as keyof T] === criteria[k as keyof T])
        )
    }

    if((key === undefined || value === undefined)||(key === undefined && value === undefined)){
        return undefined
    }

    return items.find(item => item[key] === value);
}

const users: User[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
];

const products: Product[] = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Smartphone", price: 500 }
];

const books: Book[] = [
    { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
    { isbn: "67890", title: "Learning TypeScript", author: "Another One" }
];
const criteriaUser = { name: "Alice", age: 25 };
const foundUser = findInArray(users, criteriaUser,"name", "Alice");

const foundProduct = findInArray(products, {},"price", 500);

const criteriaBook = { author: "Another One" };
const foundBook = findInArray(books,criteriaBook, "title", "Learning TypeScript");
//-----------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
    name: string;
    age: number;
}
  
interface Adult {
    fullName: string;
    age: number;
}
  
// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T,U>(items:T[], transform:(item:T) => U, filter:(item:U)=>boolean):U[] {
    return items.map(transform).filter(filter);
}
  
// Пример данных
const people: Person[] = [
    { name: "Alice", age: 24 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 32 }
];
  
// Пример использования функции mapAndFilter
const adults: Adult[] = mapAndFilter(
    people,
    (person) => ({ fullName: person.name, age: person.age }),
    (adult) => adult.age >= 18
);
  
// Выведите результаты для проверки
console.log(adults);
  
  
//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?
// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.

//Ответы 
// Функция просто будет принимать ещё один параметр  к примеру    sort?: (a: U, b: U) => number
// Да, типы могут быть разными, здесь важно, чтобы функции transform и filter принимали элементы соотвествующего типа 


