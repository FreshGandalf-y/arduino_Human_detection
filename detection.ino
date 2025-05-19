int SENDEN=7;
int ECHO=6;
int sund=2;
int person=0;
int summe=0;
int bleu=4;
int tasterPin = 11;
int personenentfernung=0;
int wand=0;
int range=80;
int red=5;
int one=1;
void setup() {
  Serial.begin(9600);
  pinMode(sund, OUTPUT);
  pinMode(SENDEN, OUTPUT);
  pinMode(red, OUTPUT);
  pinMode(bleu, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(tasterPin, INPUT);
 
}
void loop() {
  digitalWrite(red,HIGH);
  long Entfernung = 0;
  digitalWrite(SENDEN, LOW);
  delay(5);
  digitalWrite(SENDEN, HIGH);
  delayMicroseconds(10);
  digitalWrite(SENDEN, LOW);
  long Zeit = pulseIn(ECHO, HIGH);
  Entfernung = (Zeit / 2) * 0.03432;
  if (digitalRead(tasterPin)==HIGH or one==1){
    digitalWrite(red,LOW);
    digitalWrite(bleu,HIGH);
    long summe=0;
    for (int i = 0; i < 100; i++){
      long Entfernung = 0;
      digitalWrite(SENDEN, LOW);
      delay(5);
      digitalWrite(SENDEN, HIGH);
      delayMicroseconds(10);
      digitalWrite(SENDEN, LOW);
      long Zeit = pulseIn(ECHO, HIGH);
      Entfernung = (Zeit / 2) * 0.03432;
      summe+=Entfernung;
    }
    wand=summe/100;
    wand-=10;
    one=2;
    person=0;
    Serial.print("R");
    Serial.println(wand);
    digitalWrite(sund,HIGH);
    digitalWrite(red,HIGH);
    delay(500);
    digitalWrite(sund,LOW);
    digitalWrite(bleu,LOW);
  }
  if (Entfernung<wand){
    person+=1;
    personenentfernung=Entfernung;
    Serial.print("E");
    Serial.print(Entfernung);
    Serial.print("P");
    Serial.println(person);
    digitalWrite(sund,HIGH);
    delay(50);
    digitalWrite(sund,LOW);
  }
  while (Entfernung<wand) {
    digitalWrite(bleu, HIGH);
    delay(1);
    digitalWrite(SENDEN, LOW);
    delay(5);
    digitalWrite(SENDEN, HIGH);
    delayMicroseconds(10);
    digitalWrite(SENDEN, LOW);
    long Zeit = pulseIn(ECHO, HIGH);
    Entfernung = (Zeit / 2) * 0.03432;
    if (Entfernung>wand+10){
      Entfernung=1;
    }
 
  }
  digitalWrite(red, LOW);
  digitalWrite(bleu, LOW);
 
 
 
}
 
