This is Isar-Aerospace technical assignment built with [Next.js](https://nextjs.org/)

# Getting Started

First, run the code below:

```bash
git clone https://github.com/jimlim14/isar-aerospace-assignment.git

cd isar-aerospace-assignment

npm install
# or
yarn install
# or
pnpm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/assignmentA](http://localhost:3000/assignmentA) and [http://localhost:3000/assignmentB](http://localhost:3000/assignmentB) for assignment A and B with your browser to see the result. Answer for Assignment C is below.
# Assignment A

Please consider the following API endpoint SpectrumStatus in the provided server.

https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus 

Upon Http GET request, this endpoint returns important sensor data, specifically the current velocity, altitude, temperature, a status message, a boolean indicating whether the vehicle is ascending or descending, and a Boolean indicating if the rocket requires any action from the user. 

Task: Build a web-based GUI (preferably using React) to appropriately visualize the sensor values retrieved from this endpoint. It is entirely up to you, which specific type(s) of visualization you chose (line charts, bar charts, gauges, text boxes etc.). Just imagine that a crew member at ground control needs to be able to easily understand the data. The UI should be updated with new data upon request from the user, e.g. through a simple click on a button.

# Assignment B

Please consider the following API endpoint SpectrumWS in the provided server.

[wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS](wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS)

Upon the right Http Get request, this endpoint will “upgrade” the communication protocol to web socket (wss) and start live streaming the same type of sensor data.

Task: Use the live data pushed by the server to continuously update the user interface. You may reuse the GUI you developed in assignment A. However, sometimes the launch vehicle randomly requires action from the crew ({“isActionRequired”: true}). Whenever this happens do the following: 
- Be sure to inform the user of this critical status change in a way that can’t be overseen. 
- Give the user the option to act in Spectrum using the third endpoint below (ActOnSpectrum).

https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum

# Assignment C

Please comment on potential improvements of the API structure, deviations from common standards or performance enhancements.

### **Comment:**

1. *Consistency in naming conventions:*
- The naming conventions for key attributes in the API responses from the first and second endpoints differ (e.g., "velocity" vs "Velocity"). It would be beneficial to maintain consistency in naming conventions for better readability and ease of use.

2. *1st API CORS issue:*
- Alternative Approach:
  - due to the lack of control over the SpectrumStatus API, I implemented a workaround by fetching data from my API route, this approach circumvents the same-origin policy I encountered that is enforced by browsers.
- Performance Impact:
  - With above mentioned alternative approach might introduce latency, and depending on the volume of data and frequency of requests, this may affect the user experience.
- Security Implications:
  - It adds a layer of protection against potential malicious actors trying to access or manipulate the data directly from web browsers with this alternative approach.

3. *Additional data from 1st and 2nd API*:
- Provide relevant details:
  - Include additional details when isActionRequired is true. This could include information about the specific nature of the required action, any options available to the user, and other relevant details that assist the user in making an informed decision.
  - Update UI to accommodate the extra data and present it in a meaningful way and incorporate interactions options.

4. *3rd API error 405:*
- One was asked to provide the option for user to act on Spectrum using ActOcSpectrum API endpoint which leads to my assumption that it should be POST (405: method not allowed) request rather than a GET that returns an empty string. In a typical RESTful API design, a GET request is used to retrieve information from the server, and a POST request is used to submit data to be processed to a specified resource.
- In this case, the operation involves taking action on the server when the `isActionRequired` flag is true. Based on RESTful principles, performing an action on the server, especially one that might have side effects like updating the server state, is typically done using a POST request. This aligns with the idea that a POST request is used for operations that are not idempotent and may change the state of the server.

# Assumption

- No fancy responsiveness because a crew that usually do the monitoring has multiple high resolution monitors with full size app in each of them, and no fancy design because information needs to be shown clean and clear.
- This is a technical assignment that tests applicants all-around skills which is why I reused the UI from Assignment A at Assignment B, and with the 500ms change on `StatusMessage`, `IsAscending`, and `IsActionRequired`, only the latest one is displayed. Something I would do differently is to display every data sent back from server with different timestamp just like the line charts on Assignment B. 
