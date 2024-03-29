#include "widget.h"
#include "test_widget.h"
#include<QDir>
#include <QApplication>
#include <QCoreApplication>
#include <qglobal.h>
#include <QGuiApplication>
#include <QTextCodec>
void SetCodec()
{
    QTextCodec *codec = QTextCodec::codecForName("UTF-8");//设置编码格式为UTF-8
    QTextCodec::setCodecForLocale(codec);//这个函数主要用于设置和对本地文件系统读写时候的默认编码格式。
}
int main(int argc, char *argv[])
{

    qputenv("QT_ENABLE_HIGHDPI_SCALING", "1");
    QGuiApplication::setHighDpiScaleFactorRoundingPolicy(Qt::HighDpiScaleFactorRoundingPolicy::PassThrough);
    //QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    QApplication a(argc, argv);
    SetCodec();
    //test_widget x;
    Widget w;

    //x.show();
    w.show();
    return a.exec();
}
