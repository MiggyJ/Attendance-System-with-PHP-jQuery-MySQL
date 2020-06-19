<!DOCTYPE html>

  <?php 

    session_start();
    // Check if ADMIN
    if (!isset($_SESSION['admin'])) {
      echo "<script language='javascript'>
              alert('You are not an ADMIN! GET OUT!')
              window.location.href = '../index.html'
            </script>";
    }

	?>

  <html>
    <head>
    	<title>Attendance Admin</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="../css/googleIcons.css">
    <link rel="stylesheet" href="../css/materialize.min.css">
    <style>
      .datepicker-date-display, .datepicker-table td.is-selected{
        background: #f57c00;
      }
      .datepicker-cancel, .datepicker-done, .datepicker-table td.is-today{
        color: #f57c00
      }
      .datepicker-table td.is-selected{
        color: #fff;
      }
      ul.dropdown-content li span {
        color: #f57c00; /* no need for !important :) */
      }
    </style>
    </head>

    <body>
      <!-- Navbar -->
      <nav>
        <div class="nav-wrapper orange darken-3">
          <a href="" class="brand-logo center">Attendance</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a href="../php/logout.php">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    
      <!-- Main Content -->
      <div class="container" style="margin-top: 50px;">
        <!-- Selectors (Section and Date) -->
        <div class="row">
          <div class="input-field col l2 s4 offset-l8 offset-s4">
            <select name="fillSection" id="fillSection" >
              <option value="BSIT 2-1">BSIT 2-1</option>
              <option value="BSIT 2-2">BSIT 2-2</option>
              <label for="fillSection">Select your Section</label>
            </select>
          </div>
          <div class="input-field col l2 s4">
            <input type="text" class="datepicker">
          </div>
        </div>
        
        <!-- Total Count of Attendance -->
        <span class="left" id="total_reg"></span>

        <!-- Table of Attendace  -->
        <table class="highlight centered striped" id="attendanceTable"  cellpadding="1" cellspacing="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student Number</th>
              <th>Picture</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            <!-- Javascript response goes here -->
          </tbody>
        </table>
        
      </div>

      <!-- Spinner -->
      <div id="cover" style="z-index: 10; height: 100vh; width: 100vw; position: fixed;
      background-color: rgba(0,0,0,0.7); top: 0; left: 0; display: none; flex-direction: column; align-items: center; justify-content: center">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
        <p class="white-text">Loading...</p>
      </div>


      <!-- Compiled and minified JavaScript -->
      <script src="../js/jquery.min.js"></script>
      <script src="../js/materialize.min.js"></script>
      <script src="../js/date.js"></script>
      <script src="../app.js"></script>   

    </body>
  </html>
