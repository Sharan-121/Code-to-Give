import 'package:app/sessions.dart';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;

Future<int> markAttendance(Map userToken, String? session) async {
  final url = Uri.parse(
      'http://127.0.0.1:5010/api/v1/beneficiary/attendance/${session!}');
  final response = await http.post(
    url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${userToken["token"]}'
    },
  );
  if (response.statusCode == 200) {
    return 1;
  } else if (response.statusCode == 400) {
    return 2;
  } else if (response.statusCode == 403) {
    return 3;
  } else {
    return 4;
  }
}

class QRCodeScannerPage extends StatefulWidget {
  final Map userToken;
  final String language;
  const QRCodeScannerPage(this.userToken, this.language, {super.key});

  @override
  _QRCodeScannerPageState createState() => _QRCodeScannerPageState();
}

class _QRCodeScannerPageState extends State<QRCodeScannerPage> {
  Barcode? result;
  QRViewController? controller;
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text(widget.language == "English"
              ? "Scan QR code"
              : "स्कैन क्यू आर कोड"),
          backgroundColor: const Color(0xFF1C4E80),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_sharp),
            color: const Color.fromRGBO(235, 235, 235, 1),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                PageRouteBuilder(
                  transitionDuration: const Duration(milliseconds: 0),
                  pageBuilder: (context, animation, secondaryAnimation) =>
                      SessionsPage(widget.userToken, widget.language),
                  transitionsBuilder:
                      (context, animation, secondaryAnimation, child) {
                    var begin = const Offset(1.0, 0.0);
                    var end = Offset.zero;
                    var curve = Curves.ease;

                    var tween = Tween(begin: begin, end: end)
                        .chain(CurveTween(curve: curve));

                    return SlideTransition(
                      position: animation.drive(tween),
                      child: child,
                    );
                  },
                ),
              );
            },
          )),
      body: Column(
        children: <Widget>[
          Expanded(
            flex: 5,
            child: QRView(
              key: qrKey,
              onQRViewCreated: _onQRViewCreated,
            ),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      setState(() async {
        result = scanData;
        int res = await markAttendance(widget.userToken, result!.code);
        if (res == 1) {
          Fluttertoast.showToast(
              msg: widget.language == "English"
                  ? "Attendance added"
                  : "उपस्थिति जोड़ी गई",
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.BOTTOM,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.blue[900],
              textColor: Colors.white,
              fontSize: 16.0);
          Navigator.pushReplacement(
            context,
            PageRouteBuilder(
              transitionDuration: const Duration(milliseconds: 0),
              pageBuilder: (context, animation, secondaryAnimation) =>
                  SessionsPage(widget.userToken, widget.language),
              transitionsBuilder:
                  (context, animation, secondaryAnimation, child) {
                var begin = const Offset(1.0, 0.0);
                var end = Offset.zero;
                var curve = Curves.ease;

                var tween = Tween(begin: begin, end: end)
                    .chain(CurveTween(curve: curve));

                return SlideTransition(
                  position: animation.drive(tween),
                  child: child,
                );
              },
            ),
          );
        } else if (res == 2) {
          Fluttertoast.showToast(
              msg: widget.language == "English"
                  ? "Attendance exist"
                  : "हाजिरी होती है",
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.BOTTOM,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.red,
              textColor: Colors.white,
              fontSize: 16.0);
          Navigator.pushReplacement(
            context,
            PageRouteBuilder(
              transitionDuration: const Duration(milliseconds: 0),
              pageBuilder: (context, animation, secondaryAnimation) =>
                  SessionsPage(widget.userToken, widget.language),
              transitionsBuilder:
                  (context, animation, secondaryAnimation, child) {
                var begin = const Offset(1.0, 0.0);
                var end = Offset.zero;
                var curve = Curves.ease;

                var tween = Tween(begin: begin, end: end)
                    .chain(CurveTween(curve: curve));

                return SlideTransition(
                  position: animation.drive(tween),
                  child: child,
                );
              },
            ),
          );
        } else if (res == 3) {
          Fluttertoast.showToast(
              msg: widget.language == "English"
                  ? "Login again"
                  : "फिर से लॉगिन करें",
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.BOTTOM,
              timeInSecForIosWeb: 1,
              backgroundColor: Colors.red,
              textColor: Colors.white,
              fontSize: 16.0);
          Navigator.pushReplacement(
            context,
            PageRouteBuilder(
              transitionDuration: const Duration(milliseconds: 0),
              pageBuilder: (context, animation, secondaryAnimation) =>
                  SessionsPage(widget.userToken, widget.language),
              transitionsBuilder:
                  (context, animation, secondaryAnimation, child) {
                var begin = const Offset(1.0, 0.0);
                var end = Offset.zero;
                var curve = Curves.ease;

                var tween = Tween(begin: begin, end: end)
                    .chain(CurveTween(curve: curve));

                return SlideTransition(
                  position: animation.drive(tween),
                  child: child,
                );
              },
            ),
          );
        }
      });
    });
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}
