# Kravspecifikation - Din Mægler

## Generelle Krav

### Tekniske Krav
- [x] Sitet bygges i standardmål efter layoutet
- [ ] Sitet skal ved hjælp af automatiseret deployment udgives på fx Netlify
- [ ] **Ekstraopgave:** Responsiv funktionalitet til tablet og telefon

### Deployment
- **Platform:** Netlify
- **CI/CD:** Automatisk deployment fra GitHub main branch
- **Environment:** Production og development miljøer

---

## 🏗️ Faste Elementer (Alle Sider)

### Header
- [x] Logo og navigation
- [ ] Kontaktoplysninger (e-mail og telefon)
- [ ] Login-mulighed
- [ ] Login/logout toggle baseret på bruger status
- [ ] "Mine favoritter" menu (kun når logget ind)

### Footer
- [ ] Logo
- [ ] Kontaktoplysninger boks
- [ ] Quick links
- [ ] "Medlem af Dansk Mægler Sammenslutning" tekst
- [ ] Credits bånd til layoutets skaber

---

## 🏠 Forsiden

### Søgefunktionalitet
- [ ] Fritekstsøgning i alle boliger
- [ ] Redirect til listevisning med søgeresultater
- [ ] Visning af søgekriterier på resultatsiden

**Teknisk Implementation:**
```typescript
interface SearchState {
  query: string
  results: Property[]
  loading: boolean
}
```

### "Vi har fulgt danskerne hjem..."
- [ ] Statisk informationsblok om Din Mægler

### Udvalgte Boliger
- [ ] Visning af fire boliger (de første fra API)
- [ ] "Vis alle boliger" knap → redirect til bolig liste
- [ ] **Ekstraopgave:** Fire tilfældige boliger i stedet for de første

**API Endpoint:** `GET /api/properties?limit=4`

### Tilmeld Nyhedsbrev
- [ ] Tilmeldingsformular
- [ ] API endpoint til tilmelding
- [ ] **Ekstraopgave:** Frameld funktionalitet

**API Endpoint:** `POST /api/newsletter/subscribe`

### Medarbejdere Sektion
- [ ] Tre medarbejdere visning
- [ ] Klik på kort → medarbejder detaljer
- [ ] "Se alle mæglere" knap → medarbejder oversigt
- [ ] **Ekstraopgave:** Tre tilfældige medarbejdere

**API Endpoint:** `GET /api/agents?limit=3`

### "Hold dig opdateret..."
- [ ] Statisk reklame sektion

---

## 🏘️ Boliger til Salg

### Listevisning
- [ ] Alle boliger til salg
- [ ] Filtrering efter boligtype (villa, ejerlejlighed, etc.)
- [ ] Pris-interval slider (min/max pris)
- [ ] Klik på bolig → detaljevisning

### Favorit Funktionalitet (Kun Logget Ind)
- [ ] Hjerte-ikon i øverste højre hjørne
- [ ] Udfyldt hjerte = favorit
- [ ] Outline hjerte = ikke favorit
- [ ] Toggle favorit ved klik

**TypeScript Interface:**
```typescript
interface PropertyFilters {
  propertyType?: 'villa' | 'ejerlejlighed' | 'radhus' | 'lejlighed'
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
}
```

---

## 🏡 Bolig Detaljevisning

### Layout Struktur
- [ ] Stort hoved billede
- [ ] Adresse og pris bånd
- [ ] Action buttons: Galleri, Plantegning, Kort
- [ ] Hjerte favorit (kun logget ind)
- [ ] Bolig detaljer under streg
- [ ] Beskrivelse og ansvarlig mægler

### Action Buttons
- [ ] **Galleri:** Overlay slideshow af billeder
- [ ] **Plantegning:** Overlay med plantegning
- [ ] **Kort:** Overlay med placering (statisk billede OK)
- [ ] **Ekstraopgave:** Dynamisk kort med lat/long koordinater

### Mægler Information
- [ ] Ansvarlig mægler sektion
- [ ] Link til mægler detaljer

---

## 📸 Overlay Funktionaliteter

### Slideshow Overlay
- [ ] Navigering gennem ejendom billeder
- [ ] Previous/Next navigation
- [ ] Close funktionalitet
- [ ] Favorit hjerte (logget ind brugere)

### Plantegning Overlay
- [ ] Visning af boligens plantegning
- [ ] Close funktionalitet
- [ ] Action buttons (genbrugt fra detaljevisning)

### Kort Overlay
- [ ] Boligens placering på kort
- [ ] **Basis:** Statisk billede
- [ ] **Ekstraopgave:** Dynamisk kort med lat/long
- [ ] Close funktionalitet

**Teknisk Note:** Koordinater i API er i generelt område som fiktiv adresse

---

## ❤️ Mine Favoritboliger

### Krav til Adgang
- [x] Kun tilgængelig når logget ind
- [ ] Menu punkt kun synligt for loggede brugere

### Funktionalitet
- [ ] Listevisning af favorit-markerede boliger
- [ ] Fallback: Besked + link hvis ingen favoritter
- [ ] Klik på bolig → detaljevisning
- [ ] "Fjern fra favoritter" knap

### Empty State
```typescript
// Hvis ingen favoritter
{
  message: "Du har ingen favorit boliger endnu",
  actionText: "Se boliger til salg",
  actionLink: "/boliger"
}
```

---

## 👥 Medarbejdere

### Oversigtsside
- [ ] Liste over alle medarbejdere
- [ ] Klik på medarbejder → detaljevisning

### Medarbejder Detaljer
- [ ] Komplet medarbejder profil
- [ ] Kontaktinformationer
- [ ] Tilknyttede boliger/specialer

**API Endpoints:**
- `GET /api/agents` - Alle medarbejdere
- `GET /api/agents/:id` - Enkelt medarbejder

---

## 🔐 Bruger Autentificering

### Login System
- [ ] Login formular
- [ ] Session management
- [ ] Logout funktionalitet
- [ ] Beskyttede ruter for favoritter

### State Management
```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}
```

---

## 📱 Responsive Design (Ekstraopgave)

### Breakpoints
- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px  
- **Desktop:** 1024px+

### Mobile Prioriteter
- [ ] Touch-friendly navigation
- [ ] Optimeret billede størrelser
- [ ] Stacked layout på små skærme
- [ ] Mobil-venlig søgning og filtre

---

## 🔧 Teknisk Implementation

### State Management Strategi
```typescript
// Custom hooks for data fetching
const useProperties = (filters?: PropertyFilters) => {
  // Implementation
}

const useFavorites = () => {
  // Implementation  
}

const useAuth = () => {
  // Implementation
}
```

### API Service Structure
```typescript
class ApiService {
  async getProperties(filters?: PropertyFilters): Promise<Property[]>
  async getProperty(id: string): Promise<Property>
  async getAgents(): Promise<Agent[]>
  async toggleFavorite(propertyId: string): Promise<void>
  async subscribeNewsletter(email: string): Promise<void>
}
```

---

## ✅ Implementerings Prioritet

### Fase 1 - Core Features
1. [ ] Header og navigation
2. [ ] Forside layout
3. [ ] Boliger listevisning
4. [ ] Bolig detaljevisning
5. [ ] Medarbejder sider

### Fase 2 - Bruger Features  
1. [ ] Login/logout system
2. [ ] Favorit funktionalitet
3. [ ] Mine favoritter side
4. [ ] Søgefunktionalitet

### Fase 3 - Ekstra Features
1. [ ] Overlay funktionaliteter
2. [ ] Nyhedsbrev system
3. [ ] Responsive design
4. [ ] Dynamisk kort integration

### Fase 4 - Optimization
1. [ ] Performance optimization
2. [ ] Error handling
3. [ ] Loading states
4. [ ] Accessibility improvements

---

*Denne kravspecifikation fungerer som udviklings roadmap og vil blive opdateret gennem projektets forløb.*
