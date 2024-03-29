#include"test_widget.h"
#include "ui_widget.h"
#include<QPushButton>
#include<QObject>
#include<QPixmap>
#include<QScreen>
#include<QTextStream>
#include<QFile>
#include<QTextDocument>
#include<QPrinter>
#include<QRect>
test_widget::test_widget()
{
//    QRect deskrect;
//    QScreen* screen = QGuiApplication::primaryScreen();
//    deskrect = screen-> geometry();//读取桌面分辨率
//    int wid = deskrect.width();
//    int hei = deskrect.height();
//    this->resize(wid - 300,hei - 100);
    this->resize(640,480);
    //this->showMaximized();
    QPushButton *button = new QPushButton(this);
    connect(button,&QPushButton::clicked,this,&test_widget::Grabwindow);
}
void test_widget::Grabwindow()
{
//    QFile file("D:/qtdocument/build-resume_operator-Desktop_Qt_5_14_2_MSVC2017_64bit-Release/resume_generator.html");
//    file.open(QIODevice::ReadOnly);
//    QTextStream in(&file);
//    QString str = in.readAll();
//    file.close();
//    qDebug()<<str;
//    QTextDocument* doc = new QTextDocument();
//    doc->setHtml(str);
//    QPrinter printer(QPrinter::HighResolution);
//    printer.setPageSize(QPrinter::A4);
//    printer.setOutputFormat(QPrinter::PdfFormat);
//    printer.setOutputFileName("D://test.pdf");
//    doc->print(&printer);
    //QScreen* screen = QGuiApplication::primaryScreen();
//    QPixmap pixmap = this->grab();

//    if(!pixmap.save("D://test.png","png"))
//    {
//         qDebug()<<"error";
//    }

}
test_widget::~test_widget()
{

}
