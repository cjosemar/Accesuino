
#include "MFRC522.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>


#define RST_PIN D4// RST-PIN for RC522 - RFID - SPI - Modul GPIO15 
#define SS_PIN  D8  // SDA-PIN for RC522 - RFID - SPI - Modul GPIO2
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance

//SSID of your network
char ssid[] = "Wifi_HackCjm"; //SSID of your Wi-Fi router
char pass[] = "Cj220229-"; //Password of your Wi-Fi router

//char ssid[] = "HackCjm"; //SSID of your Wi-Fi router
//char pass[] = "Cj220229"; //Password of your Wi-Fi router

String url = "http://apiaccesduino.pozo-alcon.com/api/registro/rfid?rfid_uuid=";

const int greenLed = D2;
const int redLed = D1;


void setup() {
  Serial.begin(9600);    // Initialize serial communications
  SPI.begin();           // Init SPI bus
  mfrc522.PCD_Init();    // Init MFRC522

  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);

  // Conectado a red wifi
  Serial.println();
  Serial.println();
  Serial.print("Conectando ...");
  Serial.println(ssid);

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");

  }
  Serial.println("");
  Serial.println("Wi-Fi conectado");
  
}

void loop() {

  
  
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    delay(500);
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    delay(500);
    return;
  }

  String UID = "";
    // Store NUID into nuidPICC array
    for (byte i = 0; i < 4; i++) {
      UID += mfrc522.uid.uidByte[i];
    }
    
  
  // Show some details of the PICC (that is: the tag/card)
  Serial.print("Card UID:");
  Serial.print(UID);
  
  Serial.println("\n");

  registrar(UID);
}

void registrar(String uuid) {
  WiFiClient client;
  HTTPClient http;
  
  if (http.begin(client, url+uuid)) {  // HTTP

      Serial.print("[HTTP] GET... " +url+uuid + "\n");
      // start connection and send HTTP header
      int httpCode = http.GET();

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);
        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          
          digitalWrite(greenLed, HIGH);
          delay(800);
          digitalWrite(greenLed, LOW);
        } else {
          digitalWrite(redLed, HIGH);
          delay(800);
          digitalWrite(redLed, LOW);
        }
      } else {
        digitalWrite(redLed, HIGH);
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    } else {
      digitalWrite(redLed, HIGH);
      Serial.printf("[HTTP} Unable to connect\n");
    }
}
